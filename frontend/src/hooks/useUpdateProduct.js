import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "@/services/apiProducts";
import { toast } from "sonner";
export default function useCreateProduct() {
  const queryclient = useQueryClient();
  const {
    mutate: createProduct,
    isPending,
    isError,
  } = useMutation({  
    mutationKey: ["products", "create"],
    mutationFn: ({ product }) => createProductApi(product),
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product created successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { createProduct, isPending, isError };
}
