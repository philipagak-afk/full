import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct as updateProductApi } from "@/services/apiProducts";
import { toast } from "sonner";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isPending, isError } = useMutation({
    mutationKey: ["products", "update"], // changed from "delete" (was a copy-paste leftover)
    mutationFn: ({ productId, product }) => updateProductApi(productId, product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to update product");
    },
  });

  return { updateProduct, isPending, isError };
}