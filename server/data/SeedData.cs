using GlucoTrack.Models;
using Microsoft.EntityFrameworkCore;

namespace GlucoTrack.Data
{
    public static class SeedData
    {
        public static async Task InitializeAsync(GlucoContext context)
        {
            // If there are already readings, do nothing
            if (await context.Readings.AnyAsync())
                return;

            var sampleReadings = new List<Reading>
            {
                new Reading { Timestamp = DateTime.UtcNow.AddHours(-4), GlucoseLevel = 95, Notes = "Before breakfast" },
                new Reading { Timestamp = DateTime.UtcNow.AddHours(-2), GlucoseLevel = 135, Notes = "After breakfast" },
                new Reading { Timestamp = DateTime.UtcNow.AddHours(-1), GlucoseLevel = 110, Notes = "Pre-lunch" },
                new Reading { Timestamp = DateTime.UtcNow.AddMinutes(-30), GlucoseLevel = 145, Notes = "After lunch" }
            };

            context.Readings.AddRange(sampleReadings);
            await context.SaveChangesAsync();
        }
    }
}
