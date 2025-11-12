using GlucoTrack.Data;
using GlucoTrack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GlucoTrack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReadingsController : ControllerBase
    {
        private readonly GlucoContext _context;

        public ReadingsController(GlucoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reading>>> GetAll()
        {
            var readings = await _context.Readings
                .OrderByDescending(r => r.Timestamp)
                .ToListAsync();
            return Ok(readings);
        }

        [HttpPost]
        public async Task<ActionResult<Reading>> Create([FromBody] Reading reading)
        {
            if (reading.GlucoseLevel <= 0)
            {
                return BadRequest("Glucose level must be positive.");
            }

            _context.Readings.Add(reading);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = reading.Id }, reading);
        }
    }
}
