using Fullstack_Web_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Fullstack_Web_API.Data
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
