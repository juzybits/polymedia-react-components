import { useMemo, useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';
import { NetworkName, getSupportedNetworks, switchNetwork } from '@polymedia/webutils';

export function NetworkSelector({ currentNetwork }: {
    currentNetwork: NetworkName;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const selectorRef = useRef(null);
    useClickOutside(selectorRef, () => setIsOpen(false));

    const supportedNetworks = useMemo(() => {
        return getSupportedNetworks(currentNetwork);
    }, [currentNetwork]);

    const ClosedSelector: React.FC = () => {
        return <div className='network-option' /* onMouseEnter={() => setIsOpen(true)} */ >
            <span className='text' onClick={() => setIsOpen(true)}>
                {currentNetwork}
            </span>
        </div>;
    };

    const OpenSelector: React.FC = () => {
        return <>
            {supportedNetworks.map((net) => (
                <NetworkOption key={net} network={net} />
            ))}
        </>;
    };

    const NetworkOption: React.FC<{ network: NetworkName }> = ({ network }) => {
        const isSelected = network === currentNetwork;
        return <div className={`network-option ${isSelected ? 'selected' : ''}`}>
            <span className='text' onClick={isSelected ? undefined : () => switchNetwork(network)}>
                {network == currentNetwork ? '>' : ''}
                {network}
            </span>
        </div>;
    };

    return <div
        id='network-selector'
        ref={selectorRef}
        // onMouseLeave={() => setIsOpen(false)}
    >
        <div className='network-options'>
            {isOpen ? <OpenSelector /> : <ClosedSelector />}
        </div>
    </div>;
}
