using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Base.Models;

namespace Base.Controllers
{
    [Route("frontend")]
    public class FrontEndController : BaseController
    {

        

        public FrontEndController() {
            
        }

        // GET api/values
        [HttpGet]
        public IActionResult Index()
        {
            //return new string[] { "value1", "value2" };
            return View();
        }

        
        

        
    }
}
