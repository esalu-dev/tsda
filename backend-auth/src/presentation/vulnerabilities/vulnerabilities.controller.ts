import {
  Controller,
  Get,
  Query,
  Headers,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import type { Response, Request } from 'express';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { VulnerabilitiesService } from 'src/application/use-cases/vulnerabilities/vulnerabilities.service';

@ApiTags('Vulnerabilities')
@Controller('vulnerabilities')
export class VulnerabilitiesController {
  constructor(
    private readonly vulnerabilitiesService: VulnerabilitiesService,
  ) {}

  @ApiOperation({
    summary: 'XSS Reflejado (Vulnerable)',
    description:
      'Endpoint vulnerable a Cross-Site Scripting (XSS). Refleja el parámetro "name" sin sanitizar.',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Tu nombre o el payload XSS',
  })
  @Get('xss/vulnerable')
  xssVulnerable(@Query('name') name: string, @Res() res: Response) {
    const html = this.vulnerabilitiesService.getVulnerableXss(name);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @ApiOperation({
    summary: 'XSS Reflejado (Seguro)',
    description:
      'Endpoint seguro contra XSS. Sanitiza las entidades HTML antes de reflejar el parámetro.',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Tu nombre o el payload XSS',
  })
  @Get('xss/secure')
  xssSecure(@Query('name') name: string, @Res() res: Response) {
    const html = this.vulnerabilitiesService.getSecureXss(name);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @ApiOperation({
    summary: 'Suplantación de Identidad / IDOR (Vulnerable)',
    description:
      'Endpoint que confía ciegamente en el header "x-user-id" para devolver información privada.',
  })
  @ApiHeader({
    name: 'x-user-id',
    required: true,
    description: 'ID del usuario a suplantar',
  })
  @Get('spoofing/vulnerable')
  spoofingVulnerable(@Headers('x-user-id') userId: string) {
    return this.vulnerabilitiesService.getVulnerableSpoofingData(userId);
  }

  @ApiOperation({
    summary: 'Suplantación de Identidad / IDOR (Seguro)',
    description:
      'Endpoint seguro que obtiene la identidad real del usuario a través del token JWT en lugar de confiar en inputs arbitrarios.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('spoofing/secure')
  spoofingSecure(@Req() req: Request) {
    const user = req.user as any;
    const userId = user?.id || user?.sub;
    return this.vulnerabilitiesService.getSecureSpoofingData(userId);
  }

  @ApiOperation({
    summary: 'Path Traversal / LFI (Vulnerable)',
    description:
      'Permite leer archivos fuera del directorio permitido utilizando "../"',
  })
  @ApiQuery({
    name: 'file',
    required: true,
    description: 'Ruta del archivo a leer',
  })
  @Get('files/vulnerable')
  filesVulnerable(@Query('file') file: string, @Res() res: Response) {
    try {
      const content = this.vulnerabilitiesService.readVulnerableFile(
        file,
        __dirname,
      );
      res.send({ content });
    } catch (e) {
      const status = e.status || 500;
      res.status(status).send(e.message);
    }
  }

  @ApiOperation({
    summary: 'Path Traversal / LFI (Seguro)',
    description:
      'Usa path.basename para evitar la navegación de directorios, limitando la lectura al directorio actual.',
  })
  @ApiQuery({
    name: 'file',
    required: true,
    description: 'Nombre del archivo a leer',
  })
  @Get('files/secure')
  filesSecure(@Query('file') file: string, @Res() res: Response) {
    try {
      const content = this.vulnerabilitiesService.readSecureFile(
        file,
        __dirname,
      );
      res.send({ content });
    } catch (e) {
      const status = e.status || 500;
      res.status(status).send(e.message);
    }
  }

  @ApiOperation({
    summary: 'Inyección SQL (Vulnerable)',
    description: 'Concatena el input directamente en la consulta SQL.',
  })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'Email a buscar o payload SQLi',
  })
  @Get('sqli/vulnerable')
  sqliVulnerable(@Query('email') email: string) {
    return this.vulnerabilitiesService.executeVulnerableSql(email);
  }

  @ApiOperation({
    summary: 'Inyección SQL (Seguro)',
    description:
      'Utiliza consultas parametrizadas para evitar la inyección de sentencias SQL.',
  })
  @ApiQuery({ name: 'email', required: true, description: 'Email a buscar' })
  @Get('sqli/secure')
  sqliSecure(@Query('email') email: string) {
    return this.vulnerabilitiesService.executeSecureSql(email);
  }

  @ApiOperation({
    summary: 'Inyección de Comandos OS (Vulnerable)',
    description:
      'Ejecuta comandos del sistema concatenando el input del usuario en child_process.exec',
  })
  @ApiQuery({
    name: 'ip',
    required: true,
    description: 'IP para hacer ping o payload de inyección',
  })
  @Get('command/vulnerable')
  commandVulnerable(@Query('ip') ip: string) {
    return this.vulnerabilitiesService.executeVulnerableCommand(ip);
  }

  @ApiOperation({
    summary: 'Inyección de Comandos OS (Seguro)',
    description:
      'Valida estrictamente que el input sea una dirección IP antes de ejecutar el comando.',
  })
  @ApiQuery({ name: 'ip', required: true, description: 'IP para hacer ping' })
  @Get('command/secure')
  commandSecure(@Query('ip') ip: string) {
    return this.vulnerabilitiesService.executeSecureCommand(ip);
  }
}
