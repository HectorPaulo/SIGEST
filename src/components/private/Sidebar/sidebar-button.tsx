import { LucideIcon } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';
import { SheetClose } from './ui/sheet';

interface SidebarButtonProps extends ButtonProps {
    icon?: LucideIcon;
    isActive?: boolean;
}

export function SidebarButton({
                                  icon: Icon,
                                  className,
                                  children,
                                  isActive,
                                  ...props
                              }: SidebarButtonProps) {
    return (
        <Button
            variant='ghost'
            className={cn(
                'gap-8 justify-start text-lg ',
                isActive && 'border-b-4 rounded-b-none font-extrabold  border-b-blue-800 text-blue-800',
                'hover:bg-blue-800 hover:text-black hover:[&>svg]:text-black',
                className
            )}
            {...props}
        >
            {Icon && <Icon size={25} />}
            <span>{children}</span>
        </Button>
    );
}

export function SidebarButtonSheet(props: SidebarButtonProps) {
    return (
        <SheetClose asChild>
            <SidebarButton {...props} />
        </SheetClose>
    );
}
