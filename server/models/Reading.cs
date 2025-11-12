namespace GlucoTrack.Models
{
    public class Reading
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public double GlucoseLevel { get; set; }
        public string? Notes { get; set; }
    }
}
