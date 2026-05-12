/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import {
  ISiitService,
  SiitValidationResult,
} from '../../../domain/services/siit.service.interface';
import { Agent } from 'https';
import { load } from 'cheerio';
import fetch from 'node-fetch';
import { MatchesCareerHelper } from 'src/infrastructure/helpers/matchesCareer.helper';
import { ValidateStudentDto } from 'src/application/dtos/request/validate-student.dto';

@Injectable()
export class SiitCrawlerService implements ISiitService {
  private agent = new Agent({
    rejectUnauthorized: false,
  });
  constructor() {}

  async validateStudent(
    dto: ValidateStudentDto,
  ): Promise<SiitValidationResult> {
    const login = await fetch(
      'https://siit.itdurango.edu.mx/sistema/acceso.php',
      {
        agent: this.agent,
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: `tipo=a&usuario=${dto.numControl}&contrasena=${dto.pin}`,
        method: 'POST',
      },
    );
    const setCookieHeader = login.headers.get('set-cookie');

    if (!setCookieHeader) {
      return {
        success: false,
        error: 'No se pudo iniciar sesión',
      };
    }
    const cookies = setCookieHeader.split(';');
    const phpsessid = cookies.find((cookie) =>
      cookie.trim().startsWith('PHPSESSID='),
    );

    const res = await fetch(
      'https://siit.itdurango.edu.mx/sistema/modulos/cons/alumnos/avance_reticular.php',
      {
        agent: this.agent,
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8;charset=UTF-8',
          cookie: `ROUTEID=.1; ${phpsessid as string}`,
        },
        method: 'GET',
      },
    );
    const text = await res.text();
    const $ = load(text);

    const career = $('table')
      .eq(1)
      .find('tr')
      .eq(1)
      .find('td')
      .first()
      .text()
      .trim();

    await fetch('https://siit.itdurango.edu.mx/sistema/cerrar_sesion.php', {
      agent: this.agent,
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',

        cookie: `ROUTEID=.1; ${phpsessid as string}`,
      },
      method: 'GET',
    });

    if (!career) {
      return {
        success: false,
        error: 'Credenciales inválidas',
      };
    }
    if (MatchesCareerHelper.matchesCareer(career)) {
      return {
        success: true,
        career,
      };
    }
    return {
      success: false,
      error:
        'Profedex no está disponible para tu carrera. Consulta los términos y condiciones para saber más.',
    };
  }
}
