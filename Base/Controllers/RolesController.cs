using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Base.Models;

namespace Base.Controllers
{
    [Route("api/[controller]")]
    public class RolesController : BaseController
    {

        private IRoleRepository roleRepository;

        public RolesController(IRoleRepository roleRepository) {
            this.roleRepository = roleRepository;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Role> Get()
        {
            //return new string[] { "value1", "value2" };
            return roleRepository.GetAll();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Role Get(int id)
        {
            return roleRepository.Find(id);
        }

        
    }
}
