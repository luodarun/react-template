/* eslint-disable */
import React, { memo, useState, forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types';
import defaultPlugins from './plugins';
import defaultToolbar from './toolbar';
import './index.less';
import {
  fontsizeFormats,
  fontFormats,
  styleFormats,
  contentStyle,
} from './fonts';
import { requestBaseUrl, imagesAddress } from '@/config/env';

const Tinymce = forwardRef((props, refs) => {
  const { value, toolBar = [], menuBar, height, getContent, uploadFn, onChange, tinymceId, isDetail } = props;
  const [hasChange, setHasChange] = useState(false);
  const [hasInit, setHasInit] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [editor, setEditor] = useState(false);
  const [editContent, setEditContent] = useState(value);
  useEffect(() => {
    initTinymce();
    return () => {
      destroyTinymce();
    };
  }, []);
  const initTinymce = () => {
    window.tinymce.init({
      language: 'zh_CN',
      selector: `#${tinymceId}`,
      height: height,
      // 新增配置 ---
      menubar: false, //去除文件栏
      readonly: isDetail,
      element_format: 'html',
      schema: 'html5',
      valid_elements: '*[*]',
      mode: 'textareas',
      entity_encoding: 'raw',
      branding: false, //去除右下角的'由tinymce驱动'
      elementpath: false, //左下角的当前标签路径
      // CONFIG
      forced_root_block: 'p',
      force_p_newlines: true,
      importcss_append: true,
      // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
      content_style: contentStyle,
      insert_button_items: 'image link | inserttable',
      // CONFIG: Paste
      paste_retain_style_properties: 'all',
      paste_word_valid_elements: '*[*]', // word需要它
      paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
      paste_convert_word_fake_lists: false, // 插入word文档需要该属性
      paste_webkit_styles: 'all',
      paste_merge_formats: true,
      paste_auto_cleanup_on_paste: false,
      // CONFIG: StyleSelect
      style_formats: styleFormats,
      // Tab
      tabfocus_elements: ':prev,:next',
      // Image
      imagetools_toolbar:
        'rotateleft rotateright | flipv fliph | editimage imageoptions',
      //结束 ----
      body_class: 'panel-body ',
      object_resizing: false,
      toolbar: toolBar.length > 0 ? toolBar : defaultToolbar,
      plugins: defaultPlugins,
      end_container_on_empty_block: true,
      fontsize_formats: fontsizeFormats,
      font_formats: fontFormats,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      default_link_target: '_blank',
      images_upload_url: '/tinymce', // 上传图片地址 tab
      link_title: false,
      nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp need Nonbreaking Space Plugin
      // 图片上传
      images_upload_handler: function (blobInfo, success, failure) {
        if (blobInfo.blob().size > self.maxSize) {
          failure('文件体积过大');
        }
        uploadPic();
        function uploadPic () {
          const formData = new FormData();
          formData.append('file', blobInfo.blob());
          uploadFn(formData).then(res => {
            if (res.code === 1) {
              success(`${requestBaseUrl.substring(0, 14)}${imagesAddress}${res.data.replace(/\\/g, "/")}`);
              // self.props.uploadComplete(res);
            } else {
              failure('上传失败: ');
              // self.props('on-upload-complete', res); // 抛出 'on-upload-complete' 钩子
            }
          });
        }
      },
      init_instance_callback: editor => {
        if (props['data-__meta'] && props['data-__meta'].initialValue) {
          setTimeout(() => {
            editor.setContent(props['data-__meta'].initialValue);
          }, 300);
        }
        setHasInit(true);
        editor.on('NodeChange Change KeyUp SetContent', () => {
          setHasChange(hasChange);
          editor.getContent({ format: 'raw' });
        });
      },
      setup (editor) {
        setEditor(editor);
        editor.on('change', e => {
          // _this.props.getContent(editor.getContent());
        });
        editor.on('keyup change', () => {
          const value = editor.getContent();
          onChange(value);
        });
        editor.on('FullscreenStateChanged', e => {
          setFullscreen(e.state);
        });
      },
    });
  }
  const destroyTinymce = () => {
    const tinymce = window.tinymce.get(tinymceId);
    if (fullscreen) {
      tinymce.execCommand('mceFullScreen');
    }
    if (tinymce) {
      tinymce.destroy();
    }
  }
  const setContent = (value) => {
    window.tinymce.get(tinymceId).setContent(value);
  }
  /*const getContent = () => {
    const value = window.tinymce
      .get(`#${tinymceId}`)
      .getContent({ format: 'html' });
    getContent(value);
  }*/
  const saveToGetContent = () => {
    if (getContent && typeof getContent === 'function') {
      getContent(
        window.tinymce.get(`#${tinymceId}`).getContent({ format: 'raw' })
      );
    }
  }

  /**
   * 上传图片成功回调
   * */
  const imageSuccessCBK = (arr) => {
    arr.forEach(v => {
      window.tinymce
        .get(tinymceId)
        .insertContent(`<img class="wscnph" src="${v.url}" >`);
    });
  }
  return (
    <div ref={refs}>
      <div
        className={
          fullscreen
            ? 'tinymce-container mce-fullscreen'
            : 'tinymce-container'
        }
      >
        <textarea id={tinymceId} />
      </div>
    </div>
  );
});
Tinymce.propTypes = {
  tinymceId: PropTypes.string,
  value: PropTypes.string,
  toolBar: PropTypes.array,
  menuBar: PropTypes.string,
  height: PropTypes.number,
  getContent: PropTypes.func,
  onChange: PropTypes.func,
  uploadFn: PropTypes.func,
};
Tinymce.defaultProps = {
  tinymceId: Date.now(),
  menubar: 'file edit insert view format table',
  height: 420,
  toolbar: [],
  uploadFn: () => { }
};
export default memo(Tinymce);
