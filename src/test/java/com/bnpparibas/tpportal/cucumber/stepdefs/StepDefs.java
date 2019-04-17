package com.bnpparibas.tpportal.cucumber.stepdefs;

import com.bnpparibas.tpportal.TdPortalApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = TdPortalApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
