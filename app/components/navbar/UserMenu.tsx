'use client';

import { AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avartar'
import MenuItem from './MenuItem';
import { useCallback, useState } from 'react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentalModal from '@/app/hooks/useRentalModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null
}
const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {

    const [isOpen, SetIsOpen] = useState(false)

    const router = useRouter()

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentalModal = useRentalModal()

    const toggleOpen = useCallback(() => {
        SetIsOpen((value) => !value)
    },[])

    const onRent = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen()
            return
        }

        rentalModal.onOpen()
        //
    }, [currentUser, loginModal])
    return (
        
        <div
            className="
                relative
            "
        >
            <div 
                className="
                    flex
                    flex-row
                    items-center
                    gap-3
                "
            >

                <div className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:gb-neutral-100
                    transition
                    cursor-pointer
                "
                onClick={onRent}
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        flex
                        flex-row
                        items-center
                        gap-3
                        cursor-pointer
                        rounded-full
                        border-neutral-200  
                        border-[1px]
                        p-4
                        md:py-1
                        md:px-2
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu />

                    <div className=' hidden md:block'>
                        <Avatar src = {currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                '> 
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? 
                        <>
                            <MenuItem onclick={() => {router.push("/trips" )}} label='My strip' />
                            <MenuItem onclick={() => {router.push("/favorites")}} label='My Favorites' />
                            <MenuItem onclick={() => {router.push("/reservations")}} label='My reservations' />
                            <MenuItem onclick={() => {router.push("/properties")}} label='My Properties' />
                            <MenuItem onclick={() => {}} label='Airbnb my home' />
                            <hr />
                            <MenuItem onclick={() => {}} label='My account' />
                            <MenuItem onclick={() => {}} label='My settings' />
                            <MenuItem onclick={() => {}} label='My notifications' />
                            <MenuItem onclick={() => {}} label='My support' />
                            <hr />
                            <MenuItem onclick={() => signOut()} label='Log out' />
                        </>: <>
                        <MenuItem onclick={loginModal.onOpen} label='Login' />
                            <MenuItem onclick={registerModal.onOpen} label='Sign up' />
                            
                        </>    
                    }
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu