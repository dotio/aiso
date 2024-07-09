import React from 'react';
import { MDXEditor, MDXEditorMethods } from '@mdxeditor/editor';
import {
  headingsPlugin,
  diffSourcePlugin,
  thematicBreakPlugin,
  listsPlugin,
  linkPlugin,
  tablePlugin,
  quotePlugin,
  markdownShortcutPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  linkDialogPlugin,
  CreateLink,
  InsertImage,
  imagePlugin,
  InsertTable,
  ListsToggle,
  Separator,

} from '@mdxeditor/editor';
import clsx from 'clsx';

import classes from './MDZEditor.module.css';

interface EditorProps {
  markdown: string;
  viewMode: 'source' | 'rich-text' | 'diff';
  className?: string;
  withToolbar?: boolean | undefined;
  key?: string | null;
  onChange?: (d:string)=>void;
}

const MdxEditorComponent = ({ markdown, viewMode = 'source', className, onChange, key = null, withToolbar }: EditorProps) => {
  const ref = React.useRef<MDXEditorMethods>(null)

  const showToolbar = withToolbar ? toolbarPlugin({
    toolbarContents: () => (
      <>
        <UndoRedo />
        <Separator />
        <BoldItalicUnderlineToggles />
        <Separator />
        <BlockTypeSelect />
        <Separator />
        <CreateLink />
        <Separator />
        <InsertImage />
        <Separator />
        <InsertTable />
        <Separator />
        <ListsToggle />

      </>
    )
  }) : []



  return (
    <MDXEditor
        key={key}
        ref={ref}
        contentEditableClassName={clsx(classes.root, className)}
        markdown={markdown}
        onChange={onChange}
        plugins={[
          headingsPlugin(),
          linkPlugin(),
          tablePlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          thematicBreakPlugin(),
          diffSourcePlugin({ viewMode }),
          listsPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          showToolbar
        ]}
      />
  );
};

export default MdxEditorComponent;
