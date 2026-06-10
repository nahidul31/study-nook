"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { error } from "better-auth/api";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteOperation = ({ info }) => {
  const router = useRouter();
  const { _id, roomName } = info;
  const handelDeleteBtn = async () => {
    // try {
    const { data: tokenData } = await authClient.token();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
      },
    );

    const data = await res.json();
    console.log("Deleted:", data);
    if (data.deletedCount > 0) {
      toast.success("Delete successful");

      router.push("/my-list");

      // page refresh
      router.refresh();
    } else {
      toast.error("Delete failed");
    }
  };
  return (
    <AlertDialog>
      <Button
        variant="flat"
        className="bg-red-100 text-red-600 rounded-xl hover:bg-red-200"
      >
        <Icon icon="material-symbols:delete-outline" width={18} />
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete project permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{roomName}</strong> and all
                of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handelDeleteBtn} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteOperation;
