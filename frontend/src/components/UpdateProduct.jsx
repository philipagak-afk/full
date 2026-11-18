import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProduct } from "@/services/apiProducts";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function UpdateProduct({ currentProduct }) {
  const [product, setProduct] = useState({
    name: currentProduct.name,
    price: currentProduct.price,
    quantity: currentProduct.quantity,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  async function handleUpdateProduct(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");
      const { name, price, quantity } = product;
      if (!name || !price || !quantity) return;
      const updatedProduct = {
        name,
        price: Number(price),
        quantity: Number(quantity),
      };
      // console.log(newProduct);
      const data = await updateProduct(currentProduct._id, updatedProduct);
      console.log(data);
      toast.success("Product updated successfully", {
        position: "top-right",
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to Update Product");
      toast.error("Failed to update Product", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="icon">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update {product.name}</DialogTitle>
        </DialogHeader>
        <form id="update-product" onSubmit={handleUpdateProduct}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={product.name}
                onChange={(e) =>
                  setProduct((p) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }
                name="name"
                type={"text"}
                placeholder="e.g: laptop"
              />
            </Field>
            <Field>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={product.price}
                onChange={(e) =>
                  setProduct((p) => ({
                    ...p,
                    price: e.target.value,
                  }))
                }
                name="price"
                placeholder="10000"
              />
            </Field>
            <Field>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={product.quantity}
                onChange={(e) =>
                  setProduct((p) => ({
                    ...p,
                    quantity: e.target.value,
                  }))
                }
                name="quantity"
                placeholder="12"
              />
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading} form="update-product">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
