import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

interface LikeButtonProps {
  movieId: string | null;
  userId: string | null;
  iconSize: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ movieId, userId, iconSize }) => {
  const [showManageFavorites, setShowManageFavorites] = useState<boolean>(false);
  const [isHoveringFavorites, setIsHoveringFavorites] = useState<boolean>(showManageFavorites);
  const [ isFavoriteHoverHelpLikeTextVisible, setIsFavoriteHoverHelpLikeTextVisible ] = useState<boolean>(false);
  const [isFavoriteHoverHelpDislikeTextVisible,setIsFavoriteHoverHelpDislikeTextVisible] = useState<boolean>(false);
  const { setAccount, selectedAccount} = useUserStore()
  const router = useRouter()

  useEffect(() => {
    setTimeout(()=> setIsHoveringFavorites(showManageFavorites), 100)
    
  }, [showManageFavorites]);
  
  const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
    try {
      const res = await axios.put("/api/account/movie/favorites", {
        accountId: userId,
        movieId,
      });
      toast.success(res.status === 201 ? "Added to favories" : "Removed from favorites");
      localStorage.removeItem("account")
      setAccount(res.data)
      localStorage.setItem("account", JSON.stringify(res.data))
      router.push("/")
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <span
      onMouseEnter={() => setShowManageFavorites(true)}
      onMouseLeave={() => setShowManageFavorites(false)}
      className="relative rounded-full p-2 text-center outline outline-zinc-700 hover:outline-white"
    >
      <FiThumbsUp size={iconSize} />
      {showManageFavorites && (
        <div
          className={`absolute rounded-full -top-2 -left-5 flex gap-3 px-3 py-1 bg-neutral-800 shadow-sm shadow-black/70 transition-all duration-500 ease-in-out ${
            isHoveringFavorites ? "opacity-100 scale-125" : "opacity-0 scale-50"
          }`}
        >
          <div
            className="relative rounded-full p-1 hover:bg-neutral-500"
            onClick={(e) =>handleLike(e)}
            onMouseEnter={() => setIsFavoriteHoverHelpLikeTextVisible(true)}
            onMouseLeave={() => setIsFavoriteHoverHelpLikeTextVisible(false)}
          >
            <FiThumbsUp size={20} />
            {isFavoriteHoverHelpLikeTextVisible && (
              <>
                <div className="absolute bg-white -top-6 -left-4 text-[9px] font-bold text-black rounded-sm px-2 z-10">
                  To&nbsp;se&nbsp;mi&nbsp;líbí
                </div>
                <div className="absolute w-3 h-3 bg-white -top-4 left-2 rotate-45"></div>
              </>
            )}
          </div>
          <div
            className="relative rounded-full p-1 hover:bg-neutral-500"
            onClick={(e) =>handleLike(e)}
            onMouseEnter={() => setIsFavoriteHoverHelpDislikeTextVisible(true)}
            onMouseLeave={() => setIsFavoriteHoverHelpDislikeTextVisible(false)}
          >
            <FiThumbsDown size={20} />
            {isFavoriteHoverHelpDislikeTextVisible && (
              <>
                <div className="absolute bg-white -top-6 -left-4 text-[9px] font-bold text-black rounded-sm px-2 z-10">
                  Nezajímavé
                </div>
                <div className="absolute w-3 h-3 bg-white -top-4 left-2 rotate-45"></div>
              </>
            )}
          </div>
        </div>
      )}
    </span>
  );
};

export default LikeButton;
