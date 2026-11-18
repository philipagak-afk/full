import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useProducts } from "@/hooks/useProducts"
import { formatDateTime } from "@/lib/utils";
import { UpdateProduct } from "./UpdateProduct";
import { DeleteProduct } from "./DeleteProduct";



export function ProductsTable() {
  const{data}=useProducts()
  const products=data?.products;
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-25">Name</TableHead>
          <TableHead>price</TableHead>
          <TableHead>quantity</TableHead>
          <TableHead className="text-right">last updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow key={product._id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell className="text-right">{formatDateTime(product.updatedAt).dateTime}</TableCell>
          <TableCell className="flex items-center gap-3"></TableCell>
          <UpdateProduct currentProduct={product}/>
          <DeleteProduct product={product}/>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}