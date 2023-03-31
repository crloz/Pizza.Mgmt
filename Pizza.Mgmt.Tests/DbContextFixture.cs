using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Pizza.Mgmt.Api.Data;

namespace Pizza.Mgmt.Tests;

public class DbContextFixture : IDisposable
{
    public AppDbContext Context { get; }
    public SqliteConnection _connection;

    public DbContextFixture()
    {
        _connection = new SqliteConnection("Filename=:memory:");
        _connection.Open();
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite(_connection)
            .Options;

        Context = new AppDbContext(options);

        // run the migrations
        
        Context.Database.EnsureCreated();
        //Context.Database.Migrate();
    }

    public void Dispose()
    {
        Context.Database.EnsureDeleted();
        Context.Dispose();
    }
}