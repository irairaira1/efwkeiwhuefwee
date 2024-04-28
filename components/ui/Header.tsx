import Link from 'next/link';
import { UserNav } from './UserNav';
import { currentUser } from '@clerk/nextjs';

export default async function Header() {
  const user = await currentUser();
  return (
    <div className="container relative m-0 mx-auto py-10 md:px-10" style={{ direction: 'rtl', textAlign: 'right' }}>
      <div className="max-width flex items-center justify-between">
        {/* logo */}
        <Link className="flex w-fit items-center gap-[2px]" href="/dashboard">
          <img
            src="/shagaf1.png"
            width={100}
            height={100}
            alt="logo"
            className="h-500 w-500 md:h-500 md:w-500"
          />
          
        </Link>
        {/* buttons */}
        <div className="flex w-fit items-center gap-[22px]">
          {user ? (
            <>
              <Link
                href={'/dashboard'}
                className="hidden cursor-pointer text-lg text-dark md:inline-block lg:text-xl"
              >
                التسجيلات
              </Link>
              <Link
                href={'/dashboard/action-items'}
                className="hidden cursor-pointer text-lg text-dark md:inline-block lg:text-xl"
              >
                الخطوات
              </Link>
              <UserNav
                image={user.imageUrl}
                name={user.firstName + ' ' + user.lastName}
                email={
                  user.emailAddresses.find(
                    ({ id }) => id === user.primaryEmailAddressId,
                  )!.emailAddress
                }
              />
            </>
          ) : (
            <Link href="/dashboard">
              <button className="text-md primary-gradient primary-shadow rounded-lg px-5 py-1 text-center text-light md:px-10 md:py-2 md:text-xl">
                 تسجيل الدخول
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
