using Microsoft.EntityFrameworkCore;
using Profedex.Infrastructure.Data;

namespace Profedex.IntegrationTests.Helpers;

public static class TestDbContextFactory
{
    public static ApplicationDBContext Create()
    {
        var options = new DbContextOptionsBuilder<ApplicationDBContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new ApplicationDBContext(options);
        context.Database.EnsureCreated();
        return context;
    }
}
