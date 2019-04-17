package com.bnpparibas.tpportal.service.mapper;

import com.bnpparibas.tpportal.domain.*;
import com.bnpparibas.tpportal.service.dto.ArticleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Article and its DTO ArticleDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoryMapper.class, MemberMapper.class})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "member.id", target = "memberId")
    ArticleDTO toDto(Article article);

    @Mapping(source = "categoryId", target = "category")
    @Mapping(source = "memberId", target = "member")
    Article toEntity(ArticleDTO articleDTO);

    default Article fromId(Long id) {
        if (id == null) {
            return null;
        }
        Article article = new Article();
        article.setId(id);
        return article;
    }
}
