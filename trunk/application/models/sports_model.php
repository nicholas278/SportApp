<?php
class Sports_model extends CI_Model {

	public function __construct()
	{
            $this->load->database();
	}

        public function get_sports($filterType = FALSE, $filterValue)
        {
            if ($filterType === FALSE)
            {
                    $query = $this->db->get('sportslist');
                    return $query->result_array();
            }
            else{
                $query = $this->db->get_where('sportslist', array($filterType => $filterValue));
                return $query->result_array();
            }
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

