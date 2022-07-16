using System.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Services;
using Core.Interfaces;
using Core.Models;
using Core.Specification;

namespace Infrastructure
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly SallaryContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(SallaryContext context)
        {
            this._context = context;
            this._dbSet = context.Set<T>();

        }
        public void Add(T entity)
        {
            entity.CreatedAt = DateTime.Now;
            _dbSet.Add(entity);

        }


        public async Task<IReadOnlyList<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }
        public async Task<IReadOnlyList<T>> GetAll(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }



        public async Task<T> GetById(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task Remove(Guid id)
        {
            var entity = await GetById(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
            }
        }

        public void Update(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }
        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_dbSet.AsQueryable(), spec);
        }


    }
}