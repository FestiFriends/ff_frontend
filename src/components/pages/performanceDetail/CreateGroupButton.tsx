import Button from '@/components/common/Button/Button';
import PlusIcon from '@/components/icons/PlusIcon';

interface CreateGroupButtonProps {
  onClick?: () => void;
}

const CreateGroupButton = ({ onClick }: CreateGroupButtonProps) => (
  <Button
    onClick={onClick}
    className='fixed right-4 bottom-23 z-20 w-fit min-w-30 gap-1 rounded-[100px] py-2.5 pr-4 pl-2.5'
  >
    <PlusIcon className='aspect-square h-6 w-6' />
    <span className='text-16_B leading-normal tracking-[-0.4px]'>
      모임 개설
    </span>
  </Button>
);

export default CreateGroupButton;
