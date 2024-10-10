import React, { useState } from 'react';
import { GeneratedMessage } from '../types';
import { Check, X, RefreshCw } from 'lucide-react';

interface MessageApprovalProps {
  message: GeneratedMessage;
  onApprove: (messageId: string, content: string) => void;
  onReject: (messageId: string) => void;
  onRegenerate: (messageId: string) => void;
}

const MessageApproval: React.FC<MessageApprovalProps> = ({ message, onApprove, onReject, onRegenerate }) => {
  const [editedContent, setEditedContent] = useState(message.content);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4">Message Approval</h2>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full h-32 p-2 border rounded mb-4"
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onReject(message.eventId)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
        >
          <X className="w-4 h-4 mr-2" /> Reject
        </button>
        <button
          onClick={() => onRegenerate(message.eventId)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
        </button>
        <button
          onClick={() => onApprove(message.eventId, editedContent)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
        >
          <Check className="w-4 h-4 mr-2" /> Approve
        </button>
      </div>
    </div>
  );
};

export default MessageApproval;