using Microsoft.EntityFrameworkCore;
using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Order> PizzaOrders { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>().ToTable("PizzaOrder");
            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<Customer>().ToTable("Customer");


            modelBuilder.Entity<Order>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Employee>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Customer>()
                .Property(c => c.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(c => c.FirstName).IsRequired();
                entity.Property(c => c.LastName).IsRequired();
                entity.Property(c => c.Phone).IsRequired();
                entity.HasIndex(c => c.Phone).IsUnique();
            });


            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.FirstName).IsRequired();
                entity.Property(e => e.LastName).IsRequired();
                entity.Property(e => e.HourlyRate).HasColumnType("decimal(18,2)").IsRequired();
            });


            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(o => o.TotalPrice).HasColumnType("decimal(18,2)").IsRequired();
                entity.Property(o => o.DeliveryAddress).IsRequired();
                entity.Property(o => o.Status).IsRequired();
                entity.Property(o => o.TipAmount).HasColumnType("decimal(18,2)").IsRequired();

                entity.HasOne(o => o.Employee)
                    .WithMany(e => e.Orders)
                    .HasForeignKey(o => o.EmployeeId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(o => o.Customer)
                    .WithMany(c => c.Orders)
                    .HasForeignKey(o => o.CustomerId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}