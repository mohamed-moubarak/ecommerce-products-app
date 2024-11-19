import ProductsList from '@/features/products-list/components/products-list';

export default function Home() {
 return (
  <div className="max-h-[calc(100%-4rem)] overflow-auto">
   <ProductsList />
  </div>
 );
}
