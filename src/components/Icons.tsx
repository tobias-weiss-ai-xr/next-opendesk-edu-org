import Image from "next/image";

type IconProps = {
  className?: string;
  size?: number;
};

const SERVICES = ['bigbluebutton', 'bookstack', 'drawio', 'etherpad', 'excalidraw', 'f13', 'grommunio', 'ilias', 'limesurvey', 'moodle', 'opencloud', 'planka', 'sogo', 'ssp', 'typo3', 'zammad'] as const;

export function ServiceIcon({ service, size = 48, className }: { service: string; size?: number; className?: string }) {
  return (
    <Image
      src={`/static/icons/${service}-icon.svg`}
      alt={`${service} icon`}
      width={size}
      height={size}
      className={className}
    />
  );
}

export function EduServicesIconSet({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-4 gap-4 ${className ?? ''}`}>
      {SERVICES.map(service => (
        <ServiceIcon key={service} service={service} size={48} />
      ))}
    </div>
  );
}

// Named exports for each service
export const BigBlueButtonIcon = (props: IconProps) => <ServiceIcon service="bigbluebutton" {...props} />;
export const BookStackIcon = (props: IconProps) => <ServiceIcon service="bookstack" {...props} />;
export const DrawioIcon = (props: IconProps) => <ServiceIcon service="drawio" {...props} />;
export const EtherpadIcon = (props: IconProps) => <ServiceIcon service="etherpad" {...props} />;
export const ExcalidrawIcon = (props: IconProps) => <ServiceIcon service="excalidraw" {...props} />;
export const F13Icon = (props: IconProps) => <ServiceIcon service="f13" {...props} />;
export const GrommunioIcon = (props: IconProps) => <ServiceIcon service="grommunio" {...props} />;
export const ILIASIcon = (props: IconProps) => <ServiceIcon service="ilias" {...props} />;
export const LimeSurveyIcon = (props: IconProps) => <ServiceIcon service="limesurvey" {...props} />;
export const MoodleIcon = (props: IconProps) => <ServiceIcon service="moodle" {...props} />;
export const OpenCloudIcon = (props: IconProps) => <ServiceIcon service="opencloud" {...props} />;
export const PlankaIcon = (props: IconProps) => <ServiceIcon service="planka" {...props} />;
export const SOGoIcon = (props: IconProps) => <ServiceIcon service="sogo" {...props} />;
export const SSPIcon = (props: IconProps) => <ServiceIcon service="ssp" {...props} />;
export const TYPO3Icon = (props: IconProps) => <ServiceIcon service="typo3" {...props} />;
export const ZammadIcon = (props: IconProps) => <ServiceIcon service="zammad" {...props} />;
