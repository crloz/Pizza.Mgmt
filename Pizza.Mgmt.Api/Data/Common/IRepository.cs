using System.Linq.Expressions;

namespace Pizza.Mgmt.Api.Data.Common;

public interface IRepository<TEntity, in TPrimaryKey> where TEntity : class, IEntity<TPrimaryKey>
{
    Task<IEnumerable<TEntity?>> FindAsync(Expression<Func<TEntity?, bool>>? filter);
    Task<TEntity?> FindByIdAsync(TPrimaryKey id);
    Task<IEnumerable<TEntity?>> FindAllIncludingAsync(params Expression<Func<TEntity, object>>[]? includeProperties);
    Task InsertAsync(TEntity entity);
    Task UpsertAsync(TEntity entity);
    Task DeleteAsync(TPrimaryKey id);
    void Delete(TEntity entity);

    Task CompleteAsync();
}