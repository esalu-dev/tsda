# ── Stage 1: Build ──
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copiar csproj primero para cache de layers
COPY Profedex.Domain/Profedex.Domain.csproj Profedex.Domain/
COPY Profedex.Application/Profedex.Application.csproj Profedex.Application/
COPY Profedex.Infrastructure/Profedex.Infrastructure.csproj Profedex.Infrastructure/
COPY Profedex.API/Profedex.API.csproj Profedex.API/

RUN dotnet restore Profedex.API/Profedex.API.csproj

# Copiar todo el código fuente y compilar
COPY . .
RUN dotnet publish Profedex.API/Profedex.API.csproj -c Release -o /app/publish

# ── Stage 2: Runtime ──
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

# Crear directorio para las SQLite DBs (Write + Event Store)
RUN mkdir -p /app/data

EXPOSE 8080

ENTRYPOINT ["dotnet", "Profedex.API.dll"]
