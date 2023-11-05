import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import EditAccount from "./editAccount";
import { useUserStore } from '@/store/userStore';

interface accountPickerProps {
  imageUrl: string;
  nickname: string;
  type: string;
  id: string;
  setAccount?: any;
}

const AccountPicker: React.FC<accountPickerProps> = ({
  imageUrl,
  nickname,
  type,
  id,
  setAccount
}) => {
  const [isEditModalOpen, setIsModalOpen] = useState(false);
  // const { userAccounts, selectedAccount, setAccount } = useUserStore();

  return (
    <>
      <div 
      onClick={() => {
        if (type === "pick") {
          setAccount({ id, nickname, imageUrl });
          localStorage.setItem("account", JSON.stringify({id,nickname,imageUrl}));
        }
      }}
      className="relative w-24 h-24 flex flex-col items-center hover:text-white cursor-pointer transition">
        <img
          src={imageUrl}
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
      {isEditModalOpen && (
        <EditAccount close={setIsModalOpen} imagePath={imageUrl} name={nickname} accountId={id}/>
      )}
    </>
  );
};

export default AccountPicker;
