import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, setPage } from '../features/campers/campersSlice';
import Filters from '../features/campers/components/Filters';
import CamperList from '../features/campers/components/CamperList';
import Button from '../components/UI/Button';
import styles from './CatalogPage.module.css';


const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, total, status, filters, pagination } = useSelector(state => state.campers);
  const favorites = useSelector(state => state.favorites.items);

  useEffect(() => {
    dispatch(fetchCampers({ filters, page: pagination.page, limit: pagination.limit }));
  }, [filters, pagination.page, pagination.limit, dispatch]);

  const handleLoadMore = () => {
    dispatch(setPage(pagination.page + 1));
  };

  const hasMore = items.length < total;

  return (
    <div className={styles.catalogPage}>
      <aside className={styles.filtersSidebar}>
        <Filters />
      </aside>
      <main className={styles.catalogMain}>
        {status === 'loading' && items.length === 0 && <p>Loading...</p>}
        {status === 'failed' && <p>Error loading campers.</p>}
        <CamperList campers={items} favorites={favorites} />
        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <Button onClick={handleLoadMore} disabled={status === 'loading'}>
              Load More
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;