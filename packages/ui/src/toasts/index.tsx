import * as React from "react";
import Overlay from "react-bootstrap/Overlay";
import Toast from "react-bootstrap/Toast";
import { useCountdown } from "../hooks/time";
import humanizeDuration from "humanize-duration";

type Message = {
  id?: string;
  timestamp: Date;
  message: string;
  title?: string;
  timeout?: number;
};

type MessageInput = {
  title?: string;
  message: string;
  timeout?: boolean | number;
};

interface Toaster {
  toast(input: MessageInput): Promise<void>;
}

export const ToasterContext = React.createContext<Toaster>({
  async toast() {
    undefined;
  },
});

const MessageWidget = ({
  message: { id, title, message, timestamp, timeout },
  onDismiss,
}: {
  message: Message;
  onDismiss: (id: string) => void;
}): JSX.Element => {
  const remaining = useCountdown(timestamp.valueOf() + (timeout ?? 0));
  return (
    <Toast onClose={() => onDismiss(id!)}>
      <Toast.Header>
        <strong className="mr-auto">{title}</strong>
        {timeout && <small>dismissing in ${humanizeDuration(remaining)}</small>}
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export const ToastOverlay = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const [toasts, setToasts] = React.useState<Record<string, Message>>({});
  const sorted = React.useMemo(() => {
    const list = Object.values(toasts);
    list.sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf());
    return list;
  }, [toasts]);
  const ref = React.useRef<any>(null);
  const toaster = React.useMemo(
    () => ({
      async toast({ message, timeout, title = "" }: MessageInput) {
        const id = `${title}:${message}`;
        const t = typeof timeout === "boolean" ? (timeout ? 10000 : undefined) : timeout;
        setToasts(toasts => ({
          ...toasts,
          [id]: { message, timeout: t, title, id: `${title}:${message}`, timestamp: new Date() },
        }));
      },
    }),
    [],
  );
  const handleDismiss = id => {
    if (!id) {
      return;
    }
    setToasts(({ [id]: _ignored, ...toasts }) => toasts);
  };
  return (
    <>
      <div ref={ref}>
        <ToasterContext.Provider value={toaster}>{children}</ToasterContext.Provider>
      </div>
      <Overlay show={sorted.length > 0} container={ref.current}>
        <div>
          {sorted.map(msg => (
            <MessageWidget key={msg.id} message={msg} onDismiss={handleDismiss} />
          ))}
        </div>
      </Overlay>
    </>
  );
};
