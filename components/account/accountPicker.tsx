import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import EditAccount from "./editAccount";
import { useUserStore } from '@/store/userStore';
import Image from "next/image";

interface accountPickerProps {
  imageUrl: string;
  nickname: string;
  type: string;
  id: string;
  likedMoviesId: string[];
}

const AccountPicker: React.FC<accountPickerProps> = ({
  imageUrl,
  nickname,
  type,
  id,
  likedMoviesId
}) => {
  const [isEditModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setAccount } = useUserStore();

  return (
    <>
      <div 
      onClick={() => {
        if (type === "pick") {
          setAccount({ id, nickname, imageUrl, likedMoviesId });
          localStorage.setItem("account", JSON.stringify({id,nickname,imageUrl, likedMoviesId}));
        }
      }}
      className="relative w-24 h-24 flex flex-col items-center hover:text-white cursor-pointer transition">
        <Image
          src={imageUrl}
          fill
          alt="user1"
          className="rounded-md hover:border-4 transition"
        />
        <h1 className="text-xl mt-1">{nickname}</h1>
        {type === "edit" && (
          <div
            onClick={() => setIsModalOpen(true)}
            className="absolute w-full h-full bg-black bg-opacity-30 flex items-center justify-center hover:border-2"
          >
            <FaPencilAlt size={30} className="text-white" />
          </div>
        )}
      </div>
        <EditAccount onEditClose={setIsModalOpen} isEditOpen={isEditModalOpen} imagePath={imageUrl} name={nickname} accountId={id}/>
    </>
  );
};

export default AccountPicker;
