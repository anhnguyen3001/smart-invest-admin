import { useCallback } from 'react';
import { blockApi } from '../utils/api';
import { useAllBlock } from './useAllBlocks';

const mapBlock = (block) => {
  return {
    id: block.id,
    name: block.name,
    thumbnailUrl: block.thumbnailUrl,
  };
};

export const useBlocksForEditor = () => {
  const { categories: blockCategories, blocks } = useAllBlock();
  const fetchBlockData = useCallback(async (id) => {
    return blockApi.getBlock(id).then((data) => data?.data?.block?.pbConfig);
  }, []);

  const convertAllBlockToPBECategory = useCallback(
    (categories, blocks) => {
      if (!blocks?.length) return [];

      const allCategory = {
        id: 0,
        name: 'Tất cả danh mục',
        blocks: blocks.map(mapBlock),
      };

      const cookedCategories = categories
        .map(({ id, name }) => {
          const currBlocks = blocks.filter(({ categoryIds = [] }) =>
            categoryIds.includes(id),
          );
          return {
            id,
            name,
            blocks: currBlocks.map(mapBlock),
          };
        })
        .filter((el) => el.blocks.length);

      return [allCategory, ...cookedCategories];
    },
    // eslint-disable-next-line
    [],
  );

  return {
    fetchBlockData,
    dataSelectBlock: convertAllBlockToPBECategory(blockCategories, blocks),
  };
};
