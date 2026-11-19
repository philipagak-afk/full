
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/services/apiProducts";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateProductMutation, isPending } = useMutation({
    mutationFn: ({ id, updatedProduct }) =>
      updateProduct(id, updatedProduct),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return { updateProduct: updateProductMutation, isPending };
}
