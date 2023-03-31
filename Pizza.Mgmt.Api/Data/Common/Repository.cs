using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Pizza.Mgmt.Api.Data.Common;

public class Repository<TEntity, TPrimaryKey> : IRepository<TEntity, TPrimaryKey>, IDisposable
    where TEntity : class, IEntity<TPrimaryKey>
{
    internal AppDbContext context;
    internal DbSet<TEntity> dbSet;

    protected Repository(AppDbContext context)
    {
        this.context = context;
        dbSet = context.Set<TEntity>();
    }

    protected IQueryable<TEntity> Queryable => dbSet.AsQueryable();

    protected virtual IQueryable<TEntity> QueryableIncluding(params Expression<Func<TEntity, object>>[]? includeProperties)
    {
        var query = Queryable;

        if (includeProperties == null)
        {
            return query;
        }

        foreach (var propertySelector in includeProperties)
        {
            query = query.Include(propertySelector);
        }

        return query;
    }

    public virtual async Task<IEnumerable<TEntity?>> FindAsync(Expression<Func<TEntity?, bool>>? filter = null)
    {
        IQueryable<TEntity?> query = Queryable;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        return await query.ToListAsync();
    }

    public virtual async Task<TEntity?> FindByIdAsync(TPrimaryKey id)
    {
        return await this.dbSet.FindAsync(id);
    }

    public virtual async Task<IEnumerable<TEntity?>> FindAllIncludingAsync(
        params Expression<Func<TEntity, object>>[]? includeProperties)
    {
        return await QueryableIncluding(includeProperties).ToListAsync();
    }

    public virtual async Task InsertAsync(TEntity entity)
    {
        await dbSet.AddAsync(entity);
    }

    public virtual async Task UpsertAsync(TEntity entity)
    {
        if (dbSet.Entry(entity).State == EntityState.Detached)
        {
            await dbSet.AddAsync(entity);
        }
        else
        {
            dbSet.Update(entity);
        }
    }


    public virtual async Task DeleteAsync(TPrimaryKey id)
    {
        TEntity? entityToDelete = await dbSet.FindAsync(id);
        if (entityToDelete != null)
        {
            Delete(entityToDelete);
        }
    }

    public virtual void Delete(TEntity entity)
    {
        if (context.Entry(entity).State == EntityState.Detached)
        {
            dbSet.Attach(entity);
        }

        dbSet.Remove(entity);
    }

    public async Task CompleteAsync()
    {
        await context.SaveChangesAsync();
    }

    private bool _disposed;

    private void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                context.Dispose();
            }
        }

        _disposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
    }
}