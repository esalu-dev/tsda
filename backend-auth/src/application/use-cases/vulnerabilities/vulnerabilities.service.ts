import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { PrismaService } from '../../../infrastructure/prisma/context/prisma.service';

@Injectable()
export class VulnerabilitiesService {
  constructor(private readonly prisma: PrismaService) {}

  getVulnerableXss(name: string): string {
    return `
      <html>
        <body>
          <h1>Hola, ${name || 'invitado'}</h1>
          <p>Este endpoint es vulnerable a XSS. Intenta enviar ?name=&lt;script&gt;alert(1)&lt;/script&gt;</p>
        </body>
      </html>
    `;
  }

  getSecureXss(name: string): string {
    const escapeHtml = (unsafe: string) => {
      return (unsafe || '').replace(/[&<"'>]/g, (match) => {
        const map: Record<string, string> = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        };
        return map[match];
      });
    };

    const safeName = escapeHtml(name);
    return `
      <html>
        <body>
          <h1>Hola, ${safeName || 'invitado'}</h1>
          <p>Este endpoint es seguro. Los scripts no se ejecutarán.</p>
        </body>
      </html>
    `;
  }

  async getVulnerableSpoofingData(userId: string) {
    if (!userId) {
      throw new BadRequestException('Falta el header x-user-id');
    }

    const user = await this.prisma.reader.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        numControl: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      message: 'Datos obtenidos exitosamente. (VULNERABLE)',
      data: {
        userId: user.id,
        email: user.email,
        username: user.username,
        numControl: user.numControl,
        role: user.role,
        secretInfo:
          'Esta es información privada del usuario ' + user.username,
      },
    };
  }

  async getSecureSpoofingData(userId: string) {
    if (!userId) {
      throw new BadRequestException('No se pudo identificar al usuario autenticado');
    }

    const user = await this.prisma.reader.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        numControl: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      message: 'Datos obtenidos exitosamente. (SEGURO)',
      data: {
        userId: user.id,
        email: user.email,
        username: user.username,
        numControl: user.numControl,
        role: user.role,
        secretInfo:
          'Esta es información privada del usuario autenticado ' +
          user.username,
      },
    };
  }

  readVulnerableFile(file: string, baseDir: string): string {
    if (!file) {
      throw new BadRequestException('Falta el query param "file"');
    }
    try {
      const filePath = path.join(baseDir, '../../../../', file);
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      throw new Error('Error leyendo el archivo: ' + e.message);
    }
  }

  readSecureFile(file: string, baseDir: string): string {
    if (!file) {
      throw new BadRequestException('Falta el query param "file"');
    }
    try {
      const safeFilename = path.basename(file);
      const filePath = path.join(baseDir, safeFilename);
      if (!fs.existsSync(filePath)) {
        throw new Error('Archivo no encontrado');
      }
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      throw new Error('Error leyendo el archivo. (SEGURO)');
    }
  }

  async executeVulnerableSql(email: string) {
    if (!email) {
      throw new BadRequestException('Falta el query param "email"');
    }
    const query = `SELECT id, email, "username", "numControl" FROM "User" WHERE email = '${email}'`;
    const result = await this.prisma.writer.$queryRawUnsafe(query);
    return {
      queryExecuted: query,
      result,
    };
  }

  async executeSecureSql(email: string) {
    if (!email) {
      throw new BadRequestException('Falta el query param "email"');
    }
    const result = await this.prisma.writer.$queryRaw`SELECT id, email, "username", "numControl" FROM "User" WHERE email = ${email}`;
    return {
      message: 'Consulta segura ejecutada exitosamente',
      result,
    };
  }

  executeVulnerableCommand(ip: string): Promise<any> {
    if (!ip) {
      throw new BadRequestException('Falta el query param "ip"');
    }
    return new Promise((resolve) => {
      const isWin = process.platform === 'win32';
      const cmd = isWin ? `ping -n 1 ${ip}` : `ping -c 1 ${ip}`;
      
      exec(cmd, (error, stdout, stderr) => {
        resolve({
          commandExecuted: cmd,
          stdout,
          stderr,
        });
      });
    });
  }

  executeSecureCommand(ip: string): Promise<any> {
    if (!ip) {
      throw new BadRequestException('Falta el query param "ip"');
    }

    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipv4Regex.test(ip)) {
      throw new BadRequestException('Formato de IP inválido');
    }

    return new Promise((resolve) => {
      const isWin = process.platform === 'win32';
      const cmd = isWin ? `ping -n 1 ${ip}` : `ping -c 1 ${ip}`;
      
      exec(cmd, (error, stdout, stderr) => {
        resolve({
          commandExecuted: cmd,
          stdout,
          stderr,
        });
      });
    });
  }
}
