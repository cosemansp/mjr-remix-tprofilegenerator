import React from 'react';

type Props = {
  children: React.ReactNode;
  title?: string;
};

const ContentLayout = ({ children, title }: Props) => (
  <>
    {title && <h1 className="border-b-2 border-gray-200 px-6 py-4 pb-4 text-2xl">{title}</h1>}
    <div className="px-6 py-4">{children}</div>
  </>
);

export default ContentLayout;
