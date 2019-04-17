package com.bnpparibas.tpportal.service.mapper;

import com.bnpparibas.tpportal.domain.*;
import com.bnpparibas.tpportal.service.dto.MemberDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Member and its DTO MemberDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MemberMapper extends EntityMapper<MemberDTO, Member> {


    @Mapping(target = "authors", ignore = true)
    Member toEntity(MemberDTO memberDTO);

    default Member fromId(Long id) {
        if (id == null) {
            return null;
        }
        Member member = new Member();
        member.setId(id);
        return member;
    }
}
