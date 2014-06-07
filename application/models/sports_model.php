<?php
class Sports_model extends CI_Model {

	public function __construct()
	{
            $this->load->database();
	}

        public function get_sports($filterArray = FALSE, $likeValue = FALSE)
        {
            if($likeValue !== FALSE){
                $this->db->or_like(array(  'sport' => $likeValue,
                                            'name' => $likeValue));
            }
            if ($filterArray === FALSE)
            {
                $query = $this->db->get('sportslist');
            }
            else{
                $query = $this->db->get_where('sportslist', $filterArray);  
            }
            return $query->result_array();
        }
        
        public function set_sports()
        {
            //$this->load->helper('url');
            //$slug = url_title($this->input->post('title'), 'dash', TRUE);

            $data = array(
                    'type' => $this->input->post('type'),
                    'name' => $this->input->post('name'),
                    'address' => $this->input->post('address')
            );

            return $this->db->insert('sportsapp', $data);
        }
        
}

