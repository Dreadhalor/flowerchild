import { VerifyEmail } from '@flowerchild/components/verify-email';
import Image from 'next/image';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const VerifyEmailPage = ({ searchParams }: Props) => {
  const token = searchParams.token;
  const userEmail = searchParams.to;

  return (
    <div className='container relative flex flex-1 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        {token && typeof token === 'string' ? (
          <div className='grid gap-6'>
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image
                alt='FLOWERCHILD email sent image'
                src='/email-sent.svg'
                fill
              />
            </div>
            <h3 className='text-2xl font-semibold'>Check your email!</h3>
            {userEmail && typeof userEmail === 'string' ? (
              <p className='text-center text-muted-foreground'>
                Your verification link is on its way to{' '}
                <span className='font-semibold'>{userEmail}</span>!
              </p>
            ) : (
              <p className='text-center text-muted-foreground'>
                Your verification link is on its way!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
