using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using Microsoft.Net.Http.Headers;

namespace API.Controllers;

[Route("api/tarefa")]
[ApiController]
public class TarefaController : ControllerBase
{
    private readonly AppDataContext _ctx;

    public TarefaController(AppDataContext context) =>
        _ctx = context;

    // GET: api/tarefa/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Tarefa> tarefas = _ctx.Tarefas.Include(x => x.Categoria).ToList();
            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet]
        [Route("listar/{id}")]
       public ActionResult<Tarefa> GetTarefa(int id)
{
    var tarefa = _ctx.Tarefas.Find(id);

    if (tarefa == null)
    {
        return NotFound();
    }

    return Ok(tarefa);
}

   

    [HttpGet]
    [Route("naoconcluidas")]
    public IActionResult Naoconcluidas()
    {
        try
        {
             List<Tarefa> tarefasEmAndamento = _ctx.Tarefas
                 .Where(x => x.Status == "Em andamento" || x.Status == "Não iniciada" )
                 
                .Include(x => x.Categoria)
                .ToList();

            return Ok(tarefasEmAndamento);
        }
        catch (Exception e)
        {
        return BadRequest(e.Message);
        }
    }



     [HttpGet]
    [Route("concluidas")]
    public IActionResult Concluidas()
    {
        try
        {
            List<Tarefa> tarefasConcluido = _ctx.Tarefas
                 .Where(x => x.Status == "Concluído")
                .Include(x => x.Categoria)
                .ToList();

            return Ok(tarefasConcluido);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // POST: api/tarefa/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Tarefa tarefa)
    {
        try
        {
            Categoria? categoria = _ctx.Categorias.Find(tarefa.CategoriaId);
            if (categoria == null)
            {
                return NotFound();
            }
            tarefa.Categoria = categoria;
            tarefa.Status = "Não iniciada";
            _ctx.Tarefas.Add(tarefa);
            _ctx.SaveChanges();
            return Created("", tarefa);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

   [HttpPatch]
[Route("alterar/{id}")]
public IActionResult Alterar([FromRoute] int id, [FromBody] Tarefa tarefa)
{
    try
    {
        // Expressões lambda
        Tarefa tarefaCadastrada = _ctx.Tarefas.FirstOrDefault(x => x.TarefaId == id);

        if (tarefaCadastrada != null)
        {
            Categoria categoria = _ctx.Categorias.Find(tarefa.CategoriaId);

            if (categoria == null)
            {
                return NotFound();
            }

            tarefaCadastrada.Categoria = categoria;
            tarefaCadastrada.Titulo = tarefa.Titulo;
            tarefaCadastrada.Descricao = tarefa.Descricao;

            if (tarefa.Status == "Não iniciada")
            {
                tarefaCadastrada.Status = "Em andamento";
            }
            else if (tarefa.Status == "Em andamento")
            {
                tarefaCadastrada.Status = "Concluído";
            }

            _ctx.Tarefas.Update(tarefaCadastrada);
            _ctx.SaveChanges();
            return Ok();
        }

        return NotFound();
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}

}
