using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models;
using Core.Specification;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> GetAll();
        Task<IReadOnlyList<T>> GetAll(ISpecification<T> spec);
        Task<T> GetById(Guid id);
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        Task Remove(Guid id);
        Task<int> CountAsync(ISpecification<T> spec);

    }
}