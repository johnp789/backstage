/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { JSX, useState } from 'react';
import { Link } from '@backstage/core-components';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';

/** @public */
export type PluginHomeContentModalClassKey = 'contentModal' | 'linkText';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    contentModal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: 'auto',
    },
    linkText: {
      marginBottom: theme.spacing(1.5),
    },
  }),
  { name: 'PluginHomeContentModal' },
);

/**
 * Props customizing the <ContentModal/> component.
 *
 * @public
 */
export type ContentModalProps = {
  modalContent: JSX.Element;
  linkContent: string | JSX.Element;
};

/**
 * A component to expand given content into a full screen modal.
 *
 * @public
 */
export const ContentModal = (props: ContentModalProps) => {
  const { modalContent, linkContent } = props;
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.linkText} data-testid="content-modal-container">
      <Link
        to="#"
        component="button"
        variant="h6"
        underline="none"
        onClick={() => setOpen(true)}
      >
        {linkContent}
      </Link>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="content-modal"
        data-testid="content-modal"
      >
        <Box className={styles.contentModal} data-testid="content-modal-open">
          {modalContent}
        </Box>
      </Modal>
    </div>
  );
};
