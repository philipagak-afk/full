
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/services/apiProducts";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: ({ id, updatedProduct }) =>
      updateProduct(id, updatedProduct),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return { update, isPending };
}
