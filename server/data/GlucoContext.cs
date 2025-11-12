using GlucoTrack.Models;
using Microsoft.EntityFrameworkCore;

namespace GlucoTrack.Data
{
    public class GlucoContext : DbContext
    {
        public GlucoContext(DbContextOptions<GlucoContext> options) : base(options)
        {
        }

        public DbSet<Reading> Readings => Set<Reading>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reading>(entity =>
            {
                entity.HasKey(r => r.Id);
                entity.Property(r => r.GlucoseLevel).IsRequired();
                entity.Property(r => r.Timestamp).IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
