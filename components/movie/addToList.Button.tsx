import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { useUserStore } from "@/store/userStore";
import { Account } from "@/d.types";

interface AddToListButtonProps {
  movieId: string | null | undefined;
  userId: string | null | undefined;
  type: string;
  size: number;
}

const AddToListButton: React.FC<AddToListButtonProps> = ({
  movieId,
  userId,
  type,
  size,
}) => {
  const [isHelpTextVisible, setisHelpTextVisible] = useState<boolean>(false);
  const { setAccount } = useUserStore();
  const router = useRouter();

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await axios.put("/api/account/movie/list", {
        accountId: userId,
        movieId,
      });
      toast.success(
        res.status === 201
          ? "Přidáno na Váš seznam"
          : "Odebráno z Vašeho seznamu"
      );
      localStorage.removeItem("account");
      setAccount(res.data);
      localStorage.setItem("account", JSON.stringify(res.data));
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <span
      onMouseEnter={() => setisHelpTextVisible(true)}
      onMouseLeave={() => setisHelpTextVisible(false)}
      onClick={handleLike}
      className="relative rounded-full p-2 text-center outline outline-zinc-700 hover:outline-white"
    >
      {type === "add" ? (
        <AiOutlinePlus size={size} />
      ) : (
        <AiOutlineCheck size={size} />
      )}
      {isHelpTextVisible && (
        <>
          <div
            className={`absolute bg-white  ${
              size === 30
                ? "-right-[100px] text-[18px] -top-11"
                : "-right-[50px] text-[9px] -top-8"
            } font-bold text-black rounded-sm px-2 py-[2px] z-10`}
          >
            {type === "add"
              ? "Přidat\u00A0na\u00A0Můj\u00A0Seznam"
              : "Odebrat\u00A0z\u00A0mého\u00A0seznamu"}
          </div>
          <div
            className={`absolute w-3 h-3 bg-white -top-5  ${
              size === 30 ? "left-4" : "left-2"
            } rotate-45`}
          ></div>
        </>
      )}
    </span>
  );
};

export default AddToListButton;
