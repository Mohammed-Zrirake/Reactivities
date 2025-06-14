using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  
    public class BuggyControler :BaseApiContoller
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult BadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("unauthorized")]
        public ActionResult UnauthorizedRequest()
        {
            return Unauthorized("This is an unauthorized request");
        }

        [HttpGet("server-error")]
        public ActionResult ServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}
