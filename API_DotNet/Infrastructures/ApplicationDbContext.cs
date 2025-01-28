using API_DotNet.Models.Customer;
using API_DotNet.Models.Orders;
using API_DotNet.Models.Product;
using API_DotNet.Models.User;
using Microsoft.EntityFrameworkCore;

namespace API_DotNet.Infrastructures
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderProducts> OrderProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Users>(e =>
            {
                e.HasKey(e => e.Id);

                e.HasIndex(h => new { h.Id, h.CPF })
                    .IsUnique();
            });

            modelBuilder.Entity<Products>(e =>
            {
                e.HasKey(e => e.Id);

                e.HasIndex(h => new { h.Id })
                    .IsUnique();

                e.Property(e => e.Preco)
                    .HasColumnType("DECIMAL(18,2)");
            });

            modelBuilder.Entity<Customers>(e =>
            {
                e.HasKey(e => e.Id);

                e.HasIndex(h => new { h.Id, h.Cnpj })
                    .IsUnique();
            });

            modelBuilder.Entity<Orders>(e =>
            {
                e.HasKey(o => o.Id);

                e.Property(e => e.Total)
                   .HasColumnType("DECIMAL(18,2)");

                e.HasOne(o => o.Customer)
                    .WithMany()
                    .HasForeignKey(o => o.CustomerId);

                e.HasOne(o => o.User)
                    .WithMany()
                    .HasForeignKey(o => o.UserId);
            });

            modelBuilder.Entity<OrderProducts>(e =>
            {
                e.HasKey(op => op.Id);

                e.Property(e => e.Price)
                   .HasColumnType("DECIMAL(18,2)");

                e.HasOne(op => op.Order)
                    .WithMany(o => o.OrderProducts)
                    .HasForeignKey(op => op.OrderId);

                e.HasOne(op => op.Product)
                    .WithMany()
                    .HasForeignKey(op => op.ProductId);
            });
        }

    }
}
