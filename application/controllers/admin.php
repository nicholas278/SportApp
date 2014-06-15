<?php

class admin extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('sports_model');
        $this->load->helper('url');
    }
    
    public function index(){

        $data['title'] = "Admin Panel"; // Capitalize the first letter 
        
        $this->load->view('templates/headeradmin', $data);
        $this->load->view('templates/menu', $data);
        $this->load->view('pages/dbedit', $data);
        
    }
    
    public function createDBItem(){
        
    }
    
}
    